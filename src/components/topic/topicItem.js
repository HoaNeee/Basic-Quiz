import { useSelector } from "react-redux";
import { Link } from "react-router";

function TopicItem(props) {
  const { item } = props;
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
          <Link to={"/quiz/" + item.id}>Làm bài</Link>
          {user && user.role === "admin" && (
            <Link
              style={{
                marginLeft: 10,
              }}
              to={"/edit-topic/" + item.id}
            >
              Chỉnh sửa
            </Link>
          )}
        </td>
      </tr>
    </>
  );
}

export default TopicItem;
