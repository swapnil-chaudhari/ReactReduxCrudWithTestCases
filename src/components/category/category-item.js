import React, { PropTypes } from 'react';

const CategoryItem = ({ onEdit, onDelete, category }) => {
    const editCategory = () => {
        onEdit(category.id);
    };

    const deleteCategory = () => {
        onDelete(category.id);
    };

    return (
        <tr>
            <td>{ category.id }</td>
            <td>{ category.name }</td>
            <td>{ category.description }</td>
            <td>
                <a
                    href="#"
                    className="btn btn-warning btn-formatter"
                    onClick={ editCategory }
                >
                    EDIT
                </a>
                <a
                    href="#"
                    className="btn btn-danger btn-formatter"
                    onClick={ deleteCategory }
                >
                    DELETE
                </a>
            </td>
        </tr>
    );
};

CategoryItem.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    category: PropTypes.object,
};

export default CategoryItem;
