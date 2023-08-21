'use client';

import { LoginFlow, UpdateLoginFlowBody } from '@ory/client';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UserAuthCard } from '@ory/elements';
import type { AxiosError } from 'axios';
import Router from 'next/router';

import { ory } from '@/lib/sdk';
// import { SetUriFlow } from '@/lib/helpers';
// import { HandleError } from '@/lib/hooks';

export default function Login() {
  const [flow, setFlow] = useState<LoginFlow | null>(null);
  const router = useRouter();

  const query = useSearchParams();

  const returnTo = query.get('return_to') ?? '';
  const flowId = query.get('flow') ?? '';

  // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
  // of a user.
  const refresh = Boolean(query.get('refresh'));

  // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
  // to perform two-factor authentication/verification.
  const aal = query.get('aal') ?? '';

  const getFlow = useCallback(
    (id: string) =>
      // If ?flow=.. was in the URL, we fetch it
      ory
        .getLoginFlow({ id })
        .then(({ data }) => setFlow(data))
        .catch(handleError),
    [],
  );

  const handleError = useCallback(
    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 404) {
      }

      if (status === 410) {
      }

      // const handle = HandleError(getFlow, setFlow, '/login', true);
      // return handle(error);
    },
    [getFlow],
  );

  const createFlow = useCallback(
    (refresh: boolean, aal: string, returnTo: string) =>
      ory
        .createBrowserLoginFlow({
          refresh: refresh,
          // Check for two-factor authentication
          aal: aal,
          returnTo: returnTo,
        })
        .then(({ data }) => {
          setFlow(data);
          router.push(`?flow=${data.id}`);
        })
        .catch(handleError),
    [handleError],
  );

  useEffect(() => {
    if (flowId) {
      getFlow(flowId).catch(() => {
        createFlow(refresh, aal, returnTo);
      });

      return;
    }

    // Otherwise we initialize it
    createFlow(refresh, aal, returnTo);
  }, []);

  const submitFlow = (values: UpdateLoginFlowBody) =>
    ory
      .updateLoginFlow({
        flow: String(flow?.id),
        updateLoginFlowBody: values,
      })
      // We logged in successfully! Let's bring the user home.
      .then(() => {
        if (flow?.return_to) {
          window.location.href = flow?.return_to;
          return;
        }
        Router.push('/');
      })
      .catch(handleError);

  return flow ? (
    // create a login form that dynamically renders based on the flow data using Ory Elements
    <UserAuthCard
      cardImage="/ory.svg"
      title={'Login'}
      // This defines what kind of card we want to render.
      flowType={'login'}
      // we always need the flow data which populates the form fields and error messages dynamically
      flow={flow}
      // the login card should allow the user to go to the registration page and the recovery page
      additionalProps={{
        forgotPasswordURL: '/recovery',
        signupURL: '/registration',
      }}
      // we might need webauthn support which requires additional js
      includeScripts={true}
      // we submit the form data to Ory
      onSubmit={({ body }) => submitFlow(body as UpdateLoginFlowBody)}
      className=""
    />
  ) : (
    <div>Loading...</div>
  );
}
