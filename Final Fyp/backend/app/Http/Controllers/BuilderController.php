<?php

namespace App\Http\Controllers;

use App\Models\Builder;
use Illuminate\Http\Request;
use Validator;

class BuilderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Builder::latest()->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Builder  $builder
     * @return \Illuminate\Http\Response
     */
    public function show(Builder $builder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Builder  $builder
     * @return \Illuminate\Http\Response
     */
    public function edit(Builder $builder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Builder  $builder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $builder = Builder::findOrFail($id);
    
    if ($request->has('name')) {
        $builder->name = $request->name;
    }
    
    if ($request->has('email')) {
        $builder->email = $request->email;
    }
    
    if ($request->has('contact')) {
        $builder->contact = $request->contact;
    }
    
    if ($request->has('experience')) {
        $builder->experience = $request->experience;
    }
    
    if ($request->has('experties')) {
        $builder->experties = $request->experties;
    }
    
    if ($request->has('fbrNTN')) {
        $builder->fbrNTN = $request->fbrNTN;
    }
    
    if ($request->has('Verification')) {
        $builder->Verification = $request->Verification;
    }

    $builder->save();
    
    return response()->json($builder);
    }

    public function addrecords(Request $request)
    {
        $experience = $request->experience;
        $expertise = $request->expertise;
        $fbr = $request->FBR;
        $id = $request->builder_id;
        
    $builder = Builder::find($id);
    if (!$builder) {
        return response()->json('Builder not found', 404);
    }
    
    $builder->experience = $experience;
    $builder->experties = $expertise;
    $builder->fbrNTN = $fbr;
    $builder->save();
    
    return response()->json('Builder Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Builder  $builder
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Builder::whereId($id)->first()->delete();
        return response()->json('Builder Successfully Deleted');
    }

    public function __construct(){
        \Config::set('auth.defaults.guard','builder-api');
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        if(! $token = auth()->attempt($validator->validated())){
            return response()->json(['error'=>'Unauthorized'],401);
        }
        return $this->createNewToken($token);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|between:2,100',
            'contact'=> 'required|string|min:11|max:11',
            'email'=>'required|email|unique:builders',
            'password'=>'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $user = Builder::create(array_merge(
            $validator->validated(),
            ['password'=> bcrypt($request->password)]
        ));
        return response()->json([
            'message'=> 'Builder created successfully',
            'user'=>$user

        ],201);
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message'=>'logged out']);
    }

    public function userProfile(){
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => strtotime(date('Y-m-d H:i:s', strtotime("+60 min"))),
            'user'=> auth()->user()
        ]);
    }
}
