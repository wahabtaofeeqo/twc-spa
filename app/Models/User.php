<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'email', 'password', 'expired_at', 'card_id',
        'phone', 'category', 'type', 'code', 'status', 'is_buyer',
        'password_reset_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Categories
     *
     */
    const GOLD = "Gold";
    const SILVER = "Silver";
    const PLATINUM = "Platinum";

    public static $categories = [
        self::GOLD,
        self::SILVER,
        self::PLATINUM
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function getStoredRole($role): Role
    {
        $roleClass = $this->getRoleClass();
        if (is_numeric($role)) {
            return $roleClass->findById($role, $this->getDefaultGuardName());
        }
        if (is_string($role)) {
            return $roleClass->findByName($role, $this->getDefaultGuardName());
        }

        return $role->first();
    }

    public static function genCode($category) {

        $year = date('Y');
        $index = array_search($category, self::$categories) + 1;

        // Due to mistake during the card creation
        $isIn = in_array($category, [self::GOLD, self::SILVER]);

        $middleNumber = ($isIn ? 1 : $index) . "02" . $index;
        $number = User::where('category', $category)->count();
        $number = str_pad(strval($number + 1), 4, "0", STR_PAD_LEFT);

        //
        return $year . $middleNumber . $number;
    }

    /**
     * Get the card that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function card()
    {
        return $this->belongsTo(Card::class);
    }
}
