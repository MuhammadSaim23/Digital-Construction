<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Appointment::latest()->get());
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
    public function store(Request $request, $id)
    {
        $builder_id = $id;
        $status = 'pending';
        Appointment::create([
            'description' => $request->description,
            'duration' => $request->duration,
            'type' => $request->projecttype,
            'duration' => $request->duration,
            'budget' => $request->budget,
            'status' => $status,
            'customer_id' => $request->customer_id,
            'builder_id' => $builder_id,  
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        $appointments = Appointment::all();
        if ($appointments->isNotEmpty()) {
            return response()->json($appointments);
        } else {
            return response()->json(['message' => 'Appointments not found'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
    
    $appointment = Appointment::find($id);
    if (!$appointment) {
        return response()->json('Appointment not found', 404);
    }
    $status = $request->input('status');
    $appointment->status = $status;
    $appointment->save();
    
    return response()->json('Appointment Scheduled');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
