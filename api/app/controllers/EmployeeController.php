<?php
namespace Controllers;

use Models\Employee;
use Illuminate\Database\Capsule\Manager as DB;

class EmployeeController extends BaserController
{

    public function isUniqueEmail($email, $id = null)
    {
        $query = Employee::query()->where('email', '=', $email);
        if ($id) {
            $query->where('id', '!=', $id);
        }
        if ($query->count('*') > 0) {
            $this->addError("Почта '$email' уже занята!", 'email');
        }
    }

    public function create($data)
    {
        $this->isUniqueEmail($data['email']);
        if ($this->hasError())
            return $this;

        if (!Employee::create($data)) {
            $this->addError('Failed to add new record!');
        }

        return $this;
    }

    public function update($data)
    {
        $id = (int)@$data['id'];

        if (!$id) {
            $this->addError('No id!');
            return $this;
        }

        if ($data['parent_id'] === $id) {
            $this->addError('Нельзя бы сам себе начальником, так не бывает!)', 'parent_id');
            return $this;
        }

        $this->isUniqueEmail($data['email'], $id);
        if ($this->hasError())
            return $this;

        Employee::query()->where('id', '=', $id)->update($data);

        return $this;
    }

    public function delete(int $id)
    {
        $id > 0 ? Employee::query()->where('id', '=', $id)->delete() :
            $this->addError('No id!');
        return $this;
    }

    public function dataProvider($page = null)
    {

        $take = 8;
        $page = $page && is_numeric($page) ? $page : 1;

        $skip = (($page - 1) >= 1) ? ($take * $page) : 0;

        $data = Employee::query()
            ->with('parent')
            ->skip($skip)
            ->take($take)
            ->get();


        $this->addData([
            'pageSize' => $take,
            'page' => $page,
            'data' => $data,
            'total' => DB::table('employee')->count('*') - $take
        ]);

        return $this;
    }

    public function search($value)
    {

        $take = 100;

        $data = Employee::query()
            ->where('email', '=', trim($value))
            ->orWhere('email', 'like', '%' . trim($value) . '%')
            ->take($take)
            ->get();


        $this->addData([
            'data' => $data,
        ]);

        return $this;
    }
}

?>
