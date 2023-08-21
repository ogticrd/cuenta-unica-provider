import { Configuration, FrontendApi } from '@ory/client';
import { edgeConfig } from '@ory/integrations/next';

const ory = new FrontendApi(new Configuration(edgeConfig));

export { ory };
