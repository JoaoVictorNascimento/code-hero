import { useLocation, useParams } from "react-router-dom";
import Title from "../../components/layout/title/Title";

export default function CharactersDetailsPage() {
  // const { id } = useParams();
  const location = useLocation();
  const characterName = location.state.characterName as string;

  return (
    <div>
       <Title text={`${characterName}`} />
    </div>
  )
}