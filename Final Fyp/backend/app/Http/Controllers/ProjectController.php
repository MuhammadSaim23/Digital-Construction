<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Appointment;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Project::get());
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
        $status = 'Active';
        Project::create([
            'startdate'=>$request->startdate,
            'enddate'=>$request->enddate,
            'description'=>$request->description,
            'status'=> $status,
            'customer_id' => $request->customer_id,
            'builder_id' => $request->builder_id,
        ]);

        $appointmentId = $request->appointmentId;
        Appointment::where('id', $appointmentId)->update(['status' => 'Active']);
        return response()->json('Project created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        $projects = Project::all();
if ($projects->isNotEmpty()) {
    return response()->json($projects);
} else {
    return response()->json(['message' => 'Projects not found'], 404);
}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    public function updateStatus($id)
{
    $status = 'Completed';
    
    $project = Project::find($id);
    if (!$project) {
        return response()->json('Project not found', 404);
    }
    
    $project->status = $status;
    $project->save();
    
    return response()->json('Project Completed');
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
