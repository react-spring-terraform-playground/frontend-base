import { useCallback, useEffect, useState } from "react";
import { postApi } from "../api";

type QueryOption = {
  isProcessing: boolean;
  onSuccess?: () => void;
  onError?: () => void;
};

type useInitialQuery = QueryOption;

export const useInitialQuery = (): useInitialQuery => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [data, setData] = useState();

  useEffect(() => {
    const func = async () => {
      setIsProcessing(true);
      try {
        const data = await postApi({ url: "", method: "POST" });
        setData(undefined);
      } catch (e) {
        console.log(e);
      } finally {
        setIsProcessing(false);
      }
    };
    func();
  }, []);

  return { isProcessing };
};

type UseQuery = {
  query: () => void;
} & QueryOption;

export const useQuery = (): UseQuery => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const query = useCallback(async () => {
    setIsProcessing(true);
    try {
      const data = await postApi({ url: "", method: "POST" });
      return data;
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { query, isProcessing };
};
