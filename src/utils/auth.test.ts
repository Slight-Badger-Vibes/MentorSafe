import { expect, test, vi } from 'vitest'
import { checkAuthAccess } from './auth'

test('checkAuthAccess redirects if no user for mentor route', async () => {
  const supabase = {
    from: vi.fn(),
    auth: { signOut: vi.fn() }
  } as any;
  const result = await checkAuthAccess(supabase, '/mentor/dashboard', null);
  expect(result.authorized).toBe(false);
  expect(result.redirect).toBe('/login/mentor');
})

test('checkAuthAccess authorizes if user is mentor', async () => {
  const supabase = {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: { id: '1' } })
        })
      })
    }),
    auth: { signOut: vi.fn() }
  } as any;
  const user = { email: 'mentor@test.com' };
  const result = await checkAuthAccess(supabase, '/mentor/dashboard', user);
  expect(result.authorized).toBe(true);
})

test('checkAuthAccess redirects if user is not mentor', async () => {
  const supabase = {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null })
        })
      })
    }),
    auth: { signOut: vi.fn() }
  } as any;
  const user = { email: 'other@test.com' };
  const result = await checkAuthAccess(supabase, '/mentor/dashboard', user);
  expect(result.authorized).toBe(false);
  expect(result.redirect).toBe('/login/mentor');
})
