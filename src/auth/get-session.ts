import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next/server';
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

export const getSession = async (req: NextRequest) => {
  // Note: token may be undefined, `activeCustomer` need Owner permission, if not token providered
  // it will generate a new anonymous session, which is not what we want
  const token = await getCookie(cookieAuthTokenKey, { req });

  // If no cookie here, directly return false, avoid generating a new anonymous session
  if (!token) {
    return false;
  }

  const body = JSON.stringify({
    query: print(ACTIVE_CUSTOMER),
  });

  const response = await fetch(process.env.NEXT_PUBLIC_SHOP_API, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
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
