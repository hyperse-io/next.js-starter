import { createLogger, LogLevel } from '@hyperse/logger';
import { createConsolePlugin } from '@hyperse/logger-plugin-console';

export const logger = createLogger({
  name: 'issilo',
  thresholdLevel: LogLevel.Warn,
})
  .use(createConsolePlugin())
  .build();
