
import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Departments = () => {
    const departments = [
        { name: 'Engineering', head: 'Sarah Jenkins', count: 42, icon: '💻' },
        { name: 'Human Resources', head: 'Mike Ross', count: 5, icon: '👥' },
        { name: 'Marketing', head: 'Jessica Pearson', count: 12, icon: '📢' },
        { name: 'Design', head: 'David Kim', count: 8, icon: '🎨' },
        { name: 'Finance', head: 'Amanda Lee', count: 5, icon: '💰' },
        { name: 'Sales', head: 'Robert Fox', count: 28, icon: '📈' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
                    <p className="text-gray-500">Manage your organization's internal structure.</p>
                </div>
                <Button>+ Add Department</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <Card key={dept.name}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                                {dept.icon}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Options</span>
                                ⋮
                            </button>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">{dept.name}</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-4">Head: {dept.head}</p>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-400 border-2 border-white"></div>
                                <div className="h-6 w-6 rounded-full bg-gray-500 border-2 border-white text-[10px] text-white flex items-center justify-center">+{dept.count}</div>
                            </div>
                            <span className="text-sm text-gray-500">{dept.count} Members</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Departments;
