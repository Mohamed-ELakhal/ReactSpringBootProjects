import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../util/http';

function CategoryList() {
  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['/categories'],
    queryFn: () => getAllCategories(),
  });

  let content = <p>Please enter a search term and to find events.</p>;

  if (categories) {
    content = (
      <div>
        <h1>Categories</h1>
        <ul>
          {categories.content.map(category => (
            <li key={category.id}>
              <Link
                to={{
                  pathname: '/products',
                  search: `?categoryId=${category.id}&categoryName=${category.name}`,
                }}
              >
                <h1>{category.name}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return content; // Return JSX directly without curly braces
}

export default CategoryList;
