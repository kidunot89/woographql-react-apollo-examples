import clsx from 'clsx';

function Logo({ className }) {
  return (
    <div
      className={clsx(
        className && className,
        'inline-flex items-center',
      )}
    >
      <div className="h-14 w-14 max-h-[90%]">
      <svg className="w-full h-full" height="100" width="100" viewBox="0 0 100 100">
        <circle className="stroke-shark fill-blue-bayoux stroke-[3]" cx="50" cy="50" r="40" />
      </svg>
      </div>
      <h1 className={clsx(
        "my-0 ml-3 hidden",
        'font-serif text-3xl font-bold text-shark',
        'lg:block'
      )}>
        ¯\_(ツ)_/¯
      </h1>
    </div>
  );
}

export default Logo;
