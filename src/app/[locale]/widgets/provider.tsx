import { nextInspectorConfig } from '@hyperse/next-inspector/config';

export const Provider = () => {
  return (
    <>
      <div className="">
        <pre>
          <code className="text-red-500">
            {JSON.stringify(nextInspectorConfig, null, 2)}
          </code>
        </pre>
      </div>
    </>
  );
};
