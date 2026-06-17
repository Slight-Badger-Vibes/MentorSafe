import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MatchDetail from '../page';
import { scheduleSession } from '@/app/actions/mentor';

// Mock server actions
vi.mock('@/app/actions/mentor', () => ({
  scheduleSession: vi.fn(),
  startSession: vi.fn(),
  completeSession: vi.fn(),
  cancelSession: vi.fn(),
}));

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    match: {
      findUnique: vi.fn().mockResolvedValue({
        id: 'match1',
        status: 'Active',
        youngPerson: { name: 'Alice' },
        parent: { name: 'Bob' },
        sessions: [],
      }),
    },
  },
}));

describe('Mentor Dashboard', () => {
  it('renders match details', async () => {
    const page = await MatchDetail({ params: Promise.resolve({ matchId: 'match1' }) });
    render(page);
    expect(screen.getByText(/Match Detail: Alice/i)).toBeDefined();
    expect(screen.getByText((content, element) => element?.tagName === 'P' && content.includes('Bob'))).toBeDefined();
  });
});
