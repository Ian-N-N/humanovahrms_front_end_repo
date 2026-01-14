
import React, { useMemo } from 'react';
import { useDepartment } from '../../context/DepartmentContext';
import { useEmployee } from '../../context/EmployeeContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Departments = () => {
    const { departments, loading: deptLoading } = useDepartment();
    const { employees, loading: empLoading } = useEmployee();

    // Calculate member count for each department
    const departmentsWithCounts = useMemo(() => {
        return departments.map(dept => {
            const memberCount = employees.filter(emp =>
                emp.department_id === dept.id ||
                emp.department === dept.name
            ).length;

            return {
                ...dept,
                count: memberCount,
                head: dept.manager?.name || dept.manager || 'Not Assigned',
                icon: getDepartmentIcon(dept.name)
            };
        });
    }, [departments, employees]);

    const getDepartmentIcon = (name) => {
        const icons = {
            'Engineering': '💻',
            'HR': '👥',
            'Human Resources': '👥',
            'Marketing': '📢',
            'Design': '🎨',
            'Finance': '💰',
            'Sales': '📈',
            'Legal': '⚖️',
            'Operations': '⚙️'
        };
        return icons[name] || '🏢';
    };

    if (deptLoading || empLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
                    <p className="text-gray-500">Manage your organization's internal structure and teams.</p>
                </div>
                <Button>+ Add Department</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentsWithCounts.map((dept) => (
                    <Card key={dept.id}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                                {dept.icon}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <span className="material-icons-round text-sm">more_vert</span>
                            </button>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">
                            {dept.description || 'No description provided.'}
                        </p>
                        <p className="text-xs text-gray-400 mb-4">Head: {dept.head}</p>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-500 border-2 border-white text-[10px] text-white flex items-center justify-center">
                                    {dept.count > 0 ? `+${dept.count}` : '0'}
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                <span className="material-icons-round text-sm align-middle mr-1">groups</span>
                                {dept.count} {dept.count === 1 ? 'Member' : 'Members'}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            {departmentsWithCounts.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <span className="material-icons-round text-4xl mb-2">business</span>
                    <p>No departments found</p>
                </div>
            )}
        </div>
    );
};

export default Departments;
