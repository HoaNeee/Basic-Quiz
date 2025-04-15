function QuizItem(props) {
  const { item, index } = props;
  return (
    <>
      <div className="quiz__item" key={item.id}>
        <p className="quiz__name">{`Câu ${index + 1}. ` + item.question}</p>
        {item.answers.map((itemAnswer, index) => (
          <div key={index} className="quiz__answers">
            <input type="radio" name={item.id} value={index} />
            <span>{itemAnswer}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default QuizItem;
