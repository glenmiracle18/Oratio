import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {id: Id<'workspaces'>, name: string };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useUpdateWorkpsace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "settled" | null
  >(null); // null or idle state as default state

  // useMemo is used to avoid re-rendering the component when the status changes
  const isPending = useMemo(() => status === "pending", [status]); // if status is eq pending, the isPending is True | same theory with the other comps
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.update);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values) as ResponseType; // when the mutations is called, it returns an Id<"workspaces"> which is parsed to the onSucecss function
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus('error')
        options?.onError?.(error as Error);
        if (options?.throwError) {
          throw error;
        }
      } finally {
        options?.onSettled?.();
        setStatus("settled");
      }
    },
    [mutation],
  );

  return { mutate, data, error, isError, isPending, isSuccess, isSettled };
};
