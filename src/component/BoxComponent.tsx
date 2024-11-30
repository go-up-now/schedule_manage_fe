import React, { useState } from "react";

interface BoxItem {
    id: number; // hoặc string, tùy vào dữ liệu của bạn
    name: string;
}

interface CheckboxComponentProps {
    selectedItem: BoxItem;
    setSelectedItem: (item: BoxItem) => void;
}

const BoxComponent: React.FC<CheckboxComponentProps> = ({ selectedItem, setSelectedItem }) => {
    // const [items, setItems] = useState<BoxItem[]>([
    //     { id: 1, name: "Nhập môn lập trình" },
    //     { id: 2, name: "Java 1" },
    //     { id: 3, name: "Java 2" },
    //     { id: 4, name: "Java 3" },
    //     { id: 5, name: "Java 4" },
    //     { id: 6, name: "Java 5" },
    //     { id: 11, name: "Nhập môn lập trình" },
    //     { id: 21, name: "Java 1" },
    //     { id: 31, name: "Java 2" },
    //     { id: 41, name: "Java 3" },
    //     { id: 51, name: "Java 4" },
    //     { id: 61, name: "Java 5" },
    // ]);

    const handleRemove = (id: number) => {
        // Cập nhật items bằng cách lọc bỏ phần tử có id tương ứng
        const updatedItems = selectedItem.filter((item) => item.id !== id);
        setSelectedItem(updatedItems);
        // setSelected(updatedItems);
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-1">
            {selectedItem.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center p-2 border border-gray-300 rounded text-xs font-bold"
                >
                    <span>{item.name}</span>
                    <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-500 text-white p-1 rounded"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BoxComponent;
