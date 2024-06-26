<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;


class JWTRoleAuth extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role = null)
    {
        try{
            $token_role = $this->auth->parseToken()->getClaim('role');
        } catch (JWTException $e) {
            return response()->json(['error'=>'Unauthenticated.'],401);
        }

        if($token_role != $role) {
            return response()->json(['error'=>'Unauthenticated22.'],401);
        }
        return $next($request);
    }
}
