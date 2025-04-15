function ResultItem(props) {
  const { item, index } = props;
  return (
    <>
      <div className="result__item" key={index}>
        <div className="result__header">
          <p className="result__name">{`Câu ${index + 1}. ` + item.question}</p>
          <div className="result__status">
            {item.isCorrect ? (
              <div className="result__status result__status--correct">
                <span>Đúng</span>
              </div>
            ) : (
              <div className="result__status result__status--incorrect">
                <span>Sai</span>
              </div>
            )}
          </div>
        </div>
        {item.answers.map((itemAnswers, index) => (
          <div
            className="result__answers"
            key={index}
            style={{
              color:
                item.isChecked && item.indexAnswer === index
                  ? item.isCorrect
                    ? "green"
                    : "red"
                  : item.isChecked && item.indexCorrect === index
                  ? "green"
                  : !item.isChecked && item.indexCorrect === index
                  ? "green"
                  : "black",
            }}
          >
            <input
              type="radio"
              name={item.question}
              value={index}
              readOnly={true}
              checked={item.isChecked ? item.indexAnswer === index : false}
            />
            <span>{itemAnswers}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResultItem;
