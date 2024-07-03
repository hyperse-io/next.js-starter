import { cookies } from 'next/headers';
import { print } from 'graphql';
import { graphql } from '@/common/graphql';
import { cookieAuthTokenKey } from '@/config/constants';

async function getResult(response: Response): Promise<any> {
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.startsWith('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
}

const ACTIVE_CUSTOMER = graphql(`
  query ActiveCustomer {
    activeCustomer {
      id
    }
  }
`);

export const getSession = async () => {
  const token = cookies().get(cookieAuthTokenKey)?.value;
  const body = JSON.stringify({
    query: print(ACTIVE_CUSTOMER),
  });
  const response = await fetch(process.env.NEXT_PUBLIC_SHOP_API, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body,
    next: {
      // we can tell next to invalidate this fetch every 10 seconds:
      revalidate: 10,
    },
  });

  const result = await getResult(response);
  if (response.ok && !result.errors && result.data) {
    return !!result.data.activeCustomer;
  } else {
    return false;
  }
};
