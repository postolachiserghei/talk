<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employee';
    protected $fillable = [
        'first_name',
        'last_name',
        'function',
        'email',
        'phone',
        'note',
        'parent_id'
    ];


    public function children()
    {
        return $this->hasMany(Employee::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Employee::class, 'parent_id');
    }
}
