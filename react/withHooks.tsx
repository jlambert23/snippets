export const withHooks = <T extends U, U>(
  Component: React.ComponentType<T>,
  hooks: Record<string, () => U>
) => {
  const ComponentWithHook = (props: Omit<T, keyof U>) => {
    const hookResults = Object.entries(hooks).reduce(
      (acc, [propName, useHook]) => ({ ...acc, [propName]: useHook() }),
      {}
    );
    return <Component {...hookResults} {...(props as T)} />;
  };

  ComponentWithHook.displayName = `withHooks(${Component.displayName})`;

  return ComponentWithHook;
};
