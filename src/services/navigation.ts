import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleIdClick = (id: number) => {
    navigate(`/quotes/${id}`);
  };

  const handleAuthorClick = (authorId: string) => {
    navigate(`/authors/${authorId.trim()}`);
  };

  const handleTagClick = (tag: string) => {
    navigate(`/tags/${tag.trim()}`);
  };

  return { handleIdClick, handleAuthorClick, handleTagClick };
};
