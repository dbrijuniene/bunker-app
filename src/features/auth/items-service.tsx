/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import Item from '../../types/item';

namespace ItemsService {

  export const get = async (): Promise<Item[]> => {
    const { data: items } = await axios.get<Item[]>('http://localhost:8000/items');

    return items;
  };
}

export default ItemsService;
