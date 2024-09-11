<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'type', 'amount', 'expired_at'
    ];

   /**
    * Get all of the users for the Card
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
   public function users()
   {
       return $this->hasMany(User::class);
   }

   /**
    * Get all of the transacions for the Card
    *
    * @return \Illuminate\Database\Eloquent\Relations\HasMany
    */
   public function transactions()
   {
       return $this->hasMany(Transaction::class);
   }
}
