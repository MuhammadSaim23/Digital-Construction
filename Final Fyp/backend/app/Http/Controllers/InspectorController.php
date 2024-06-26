<?php

namespace App\Http\Controllers;

use App\Models\Inspector;
use Illuminate\Http\Request;
use Auth;
use Validator;

class InspectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Inspector::latest()->get());
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

    public function addrecords(Request $request)
    {
        $experience = $request->experience;
        $expertise = $request->experties;
        $lecnum = $request->pecliscence;
        $id = $request->inspector_id;
        
    $inspector = Inspector::find($id);
    if (!$inspector) {
        return response()->json('Inspector not found', 404);
    }
    
    $inspector->experience = $experience;
    $inspector->experties = $expertise;
    $inspector->fbrNTN = $lecnum;
    $inspector->save();
    
    return response()->json('Inspector Updated Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Inspector  $inspector
     * @return \Illuminate\Http\Response
     */
    public function show(Inspector $inspector)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Inspector  $inspector
     * @return \Illuminate\Http\Response
     */
    public function edit(Inspector $inspector)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Inspector  $inspector
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $inspector = Inspector::findOrFail($id);
    
    if ($request->has('name')) {
        $inspector->name = $request->name;
    }
    
    if ($request->has('email')) {
        $inspector->email = $request->email;
    }
    
    if ($request->has('contact')) {
        $inspector->contact = $request->contact;
    }
    
    if ($request->has('experience')) {
        $inspector->experience = $request->experience;
    }
    
    if ($request->has('experties')) {
        $inspector->experties = $request->experties;
    }
    
    if ($request->has('fbrNTN')) {
        $inspector->fbrNTN = $request->fbrNTN;
    }
    
    if ($request->has('Verification')) {
        $inspector->Verification = $request->Verification;
    }

    $inspector->save();
    
    return response()->json($inspector);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Inspector  $inspector
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Inspector::whereId($id)->first()->delete();
        return response()->json('Inspector Successfully Deleted');
    }

    public function __construct(){
        \Config::set('auth.defaults.guard','inspector-api');
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
            'email'=>'required|email|unique:inspectors',
            'password'=>'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(),400);
        }
        $user = Inspector::create(array_merge(
            $validator->validated(),
            ['password'=> bcrypt($request->password)]
        ));
        return response()->json([
            'message'=> 'Inpsector created successfully',
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
