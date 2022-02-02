import { createAction, PrepareAction } from '@reduxjs/toolkit'

export default function createApiRequestActions<T = void, S = void>(
  type: string,
  prepareAction: PrepareAction<T>
) {
  return {
    init: createAction(`${type}__INIT`, (payload?: any) => ({
      payload,
    })),
    clear: createAction(`${type}__CLEAR`, (payload?: any) => ({
      payload,
    })),
    request: createAction(`${type}_REQUEST`, (args?: any) => {
      const { payload } = prepareAction(args)
      return { payload }
    }),
    start: createAction(`${type}_REQUEST-START`, (payload?: any) => ({
      payload,
    })),
    success: createAction(`${type}_REQUEST-SUCCESS`, (payload: { data: S }) => ({
      payload,
    })),
    error: createAction(`${type}_REQUEST-ERROR`, (payload) => ({
      payload,
    })),
  }
}

// const forTypes = createApiRequestActions<any, any>("__fortype", () => ({
//   payload: { url: "", method: "get" },
// }));

// export type _RequestActionsType = typeof forTypes;

export type RequestActionsType = ReturnType<typeof createApiRequestActions>
