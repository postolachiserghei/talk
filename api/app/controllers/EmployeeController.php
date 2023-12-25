<?php
namespace Controllers;

use Models\Employee;
use Illuminate\Database\Capsule\Manager as DB;

class EmployeeController extends BaserController
{
    public function create($data)
    {
        if (!Employee::create($data)) {
            $this->addError('Failed to add new record!');
        }

        return $this;
    }

    public function update($data)
    {
        $id = (int)@$data['id'];
        $id ? Employee::query()->where('id', '=', $id)->update($data) :
            $this->addError('No id!');
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
//            ->where('email', '=', $value)
            ->orWhere('email', 'like', '%' . $value . '%')
            ->take($take)
            ->orderBy('email', 'asc')
            ->get();


        $this->addData([
            'data' => $data,
        ]);

        return $this;
    }
}

?>
