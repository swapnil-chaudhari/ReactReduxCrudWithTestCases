import React, { PropTypes } from 'react';
import CategoryItem from './category-item';

const Categories = ({
                        categories,
                        onDelete,
                        onEdit,
                        startOffset,
                        startCount,
                        perPage
                    }) => {
    const deleteCategory = (id) => {
        onDelete(id);
    };

    const editCategory = (id) => {
        onEdit(id);
    };

    const categoryListItems = () => {
        let categoryList;
        let counter = startCount;
        if (categories.length > 0)
            categoryList = categories.map((category, index) => {
                if (index >= startOffset && startCount < perPage) {
                    counter++;
                    return (
                        <CategoryItem
                            onEdit={ editCategory }
                            onDelete={ deleteCategory }
                            category={ category }
                            key={ index }
                        />
                  );
                }
                return {};
            }, {});
        return categoryList;
    };

    return (
        <div className="categories">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>
                            <a href="#" >Id</a>
                        </th>
                        <th>
                            <a href="#" >Title </a>
                        </th>
                        <th>
                            <a href="#" >Description </a>
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { categoryListItems() }
                </tbody>
            </table>
        </div>
    );
};

Categories.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    categories: PropTypes.array,
    startOffset: PropTypes.number,
    perPage: PropTypes.number,
    startCount: PropTypes.number,
};

export default Categories;
