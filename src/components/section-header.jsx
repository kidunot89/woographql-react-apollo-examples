import clsx from 'clsx';

function SectionHeader(props) {
  const {
    children,
    as: Element = 'div',
    className,
  } = props;
  return (
    <Element
      className={clsx(
        className && className,
        'block font-semibold mb-2 text-lg',
      )}
    >
      {children}
    </Element>
  );
}

export default SectionHeader;
