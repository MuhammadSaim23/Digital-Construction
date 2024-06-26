<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\BuilderController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InspectorController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix'=> 'customers'], function ($router) {
    Route::post('/login',[CustomerController::class, 'login']);
    Route::post('/register',[CustomerController::class, 'register']);
    Route::get('/productsdata',[ProductController::class, 'show']);
    Route::post('/carts', [CartController::class, 'store']);
    Route::get('/cartsdata', [CartController::class, 'show']);
    Route::delete('/cartsdata/{id}', [CartController::class, 'destroy']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/ordersdata', [OrderController::class, 'show']);
    Route::post('/appointments/{id}', [AppointmentController::class, 'store']);
    Route::get('/appointments', [AppointmentController::class, 'show']);
    Route::post('/orderproject', [ProjectController::class, 'store']);
});

Route::group(['middleware'=>['jwt.role:customers', 'jwt.auth'],'prefix'=>'customers'],function ($router){
    Route::post('/logout',[CustomerController::class, 'logout']);
    Route::get('/user-profile',[CustomerController::class, 'userProfile']);
});

Route::group(['prefix'=> 'builders'], function ($router) {
    Route::post('/login',[BuilderController::class, 'login']);
    Route::post('/register',[BuilderController::class, 'register']);
    Route::post('/builderdetails', [BuilderController::class, 'addrecords']);
    Route::get('/appointments', [AppointmentController::class, 'show']);
    Route::post('appointmentresponse/{id}', [AppointmentController::class, 'update']);
    Route::get('/projectsdata', [ProjectController::class, 'show']);
    Route::post('/projectsmarked/{id}', [ProjectController::class, 'updatestatus']);
});

Route::group(['middleware'=>['jwt.role:builders', 'jwt.auth'],'prefix'=>'builders'],function ($router){
    Route::post('/logout',[BuilderController::class, 'logout']);
    Route::get('/user-profile',[BuilderController::class, 'userProfile']);
});

Route::group(['prefix'=> 'companies'], function ($router) {
    Route::post('/login',[CompanyController::class, 'login']);
    Route::post('/register',[CompanyController::class, 'register']);
    Route::post('/products',[ProductController::class, 'store']);
    Route::delete('/productsdata/{id}', [ProductController::class, 'destroy']);
    Route::post('/ordersmarked/{id}', [OrderController::class, 'updatestatus']);
});

Route::group(['middleware'=>['jwt.role:companies', 'jwt.auth'],'prefix'=>'companies'],function ($router){
    Route::post('/logout',[CompanyController::class, 'logout']);
    Route::get('/user-profile',[CompanyController::class, 'userProfile']);
});

Route::group(['prefix'=> 'inspectors'], function ($router) {
    Route::post('/login',[InspectorController::class, 'login']);
    Route::post('/register',[InspectorController::class, 'register']);
    Route::post('/inspectordetails', [InspectorController::class, 'addrecords']);
});

Route::group(['middleware'=>['jwt.role:inspectors', 'jwt.auth'],'prefix'=>'inspectors'],function ($router){
    Route::post('/logout',[InspectorController::class, 'logout']);
    Route::get('/user-profile',[InspectorController::class, 'userProfile']);
});

Route::group(['prefix'=> 'admins'], function ($router) {
    Route::post('/login',[AdminController::class, 'login']);
    Route::post('/register',[AdminController::class, 'register']);
    Route::delete('/deletecustomer/{id}', [CustomerController::class, 'destroy']);
    Route::delete('/deleteinspector/{id}', [InspectorController::class, 'destroy']);
    Route::delete('/deletecompany/{id}', [CompanyController::class, 'destroy']);
    Route::delete('/deletebuilder/{id}', [BuilderController::class, 'destroy']);
    Route::put('/updatecustomer/{id}', [CustomerController::class, 'update']);
    Route::put('/updatebuilder/{id}', [BuilderController::class, 'update']);
    Route::put('/updatecompany/{id}', [CompanyController::class, 'update']);
    Route::put('/updateinspector/{id}', [InspectorController::class, 'update']);
});

Route::group(['middleware'=>['jwt.role:admins', 'jwt.auth'],'prefix'=>'admins'],function ($router){
    Route::post('/logout',[AdminController::class, 'logout']);
    Route::get('/user-profile',[AdminController::class, 'userProfile']);
});


Route::resource('customers',CustomerController::class);
Route::resource('builders',BuilderController::class);
Route::resource('companies',CompanyController::class);
Route::resource('inspectors',InspectorController::class);

