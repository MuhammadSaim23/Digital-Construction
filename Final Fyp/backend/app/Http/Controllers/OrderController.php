<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Cart;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Order::get());
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
        $cartdata = Cart::all();

// Group cart data by company ID
$groupedData = $cartdata->groupBy('company_id');

foreach ($groupedData as $companyId => $products) {
    // Calculate total bill for products with the same company ID
    $totalBill = $products->sum('price');

    $productNames = $products->pluck('productname');
    $quantities = $products->pluck('quantity');
    $status = 'In shipment';

    // Create order for each company ID
    Order::create([
        'customer_id' => $request->customer_id,
        'name' => $request->name,
        'address' => $request->address,
        'productnames' => $productNames,
        'quantities' => $quantities,
        'totalbill' => $totalBill,
        'orderdate' => $request->order_date,
        'status' => $status,
        'company_id' => $companyId,
    ]);

}

        $userID = $request->customer_id;

        Cart::where('customer_id', $userID)->delete();
    
        return response()->json('Order placed successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        $orders = Order::all();
if ($orders->isNotEmpty()) {
    return response()->json($orders);
} else {
    return response()->json(['message' => 'Orders not found'], 404);
}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function updateStatus($id)
{
    $status = 'Delivered';
    
    $order = Order::find($id);
    if (!$order) {
        return response()->json('Order not found', 404);
    }
    
    $order->status = $status;
    $order->save();
    
    return response()->json('Order Completed');
}



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
