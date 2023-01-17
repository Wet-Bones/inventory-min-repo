import { useQuery } from '@tanstack/react-query';
import { API } from 'aws-amplify';
import { queryKeys } from '../../../utility/QueryKeys';

const loadItems = async() => {
  const response = await API.get("items", "/items", {});

  return response;
  }

export function useAllItems() {
  const fallback: any[] = [];

  const { data = fallback } = useQuery([queryKeys.items], loadItems);

  return data;
}
