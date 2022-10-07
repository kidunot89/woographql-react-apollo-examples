function Price({ className, amount }) {
  return (
    <span className={className}>
      $
      {amount}
    </span>
  );
}

export default Price;
