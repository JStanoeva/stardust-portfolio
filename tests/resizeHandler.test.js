import { JSDOM } from 'jsdom';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../scripts/createStars.js', () => ({
  createStars: jest.fn(),
}));

let handleResize;
let createStars;

beforeEach(async () => {
  jest.resetModules();
  const dom = new JSDOM(`<!DOCTYPE html><div id="star-container"></div>`);
  global.window = dom.window;
  global.document = dom.window.document;
  global.window.innerWidth = 500; // start mobile
  ({ handleResize } = await import('../scripts/main.js'));
  ({ createStars } = await import('../scripts/createStars.js'));
  createStars.mockClear();
});

test('does not create stars when width remains mobile', () => {
  window.innerWidth = 600;
  handleResize();
  expect(createStars).not.toHaveBeenCalled();
});

test('creates stars when switching from mobile to desktop', () => {
  window.innerWidth = 800;
  handleResize();
  expect(createStars).toHaveBeenCalled();
});

test('creates stars when switching from desktop to mobile', async () => {
  // Re-import with desktop width
  jest.resetModules();
  const dom = new JSDOM(`<!DOCTYPE html><div id="star-container"></div>`);
  global.window = dom.window;
  global.document = dom.window.document;
  global.window.innerWidth = 1000;
  ({ handleResize } = await import('../scripts/main.js'));
  ({ createStars } = await import('../scripts/createStars.js'));
  createStars.mockClear();

  window.innerWidth = 500;
  handleResize();
  expect(createStars).toHaveBeenCalled();
});

