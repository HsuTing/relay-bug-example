import React from 'react';
import { QueryRenderer, fetchQuery } from 'react-relay';
import NextApp, { Container } from 'next/app';

import { initEnvironment, createEnvironment } from 'utils/createEnvironment';

export default class App extends NextApp {
  static getInitialProps = async ({ Component, ctx }) => {
    const { variables } = (await Component.getInitialProps?.(ctx)) || {};

    try {
      if (initEnvironment) {
        const { environment, relaySSR } = initEnvironment(ctx);

        await fetchQuery(environment, Component.query, variables);

        return {
          variables,
          relayData: await relaySSR?.getCache(),
        };
      }
    } catch(e) {}

    return {
      variables,
    };
  };

  render() {
    const { Component, variables = {}, relayData } = this.props;
    const environment = createEnvironment(
      relayData,
      JSON.stringify({
        queryID: Component.query?.().name,
        variables,
      }),
    );

    return (
      <Container>
        <QueryRenderer
          environment={environment}
          query={Component.query}
          variables={variables}
          render={({ error, props }) => {
            if (error) return <div>{error.message}</div>;
            if (props)
              return <Component {...props} environment={environment} />;
            return <div>Loading</div>;
          }}
        />
      </Container>
    );
  }
}
