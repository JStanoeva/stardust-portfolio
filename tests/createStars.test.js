import { JSDOM } from 'jsdom';
import { createStars } from '../scripts/createStars.js';

describe('createStars', () => {
  test('adds 200 stars when width < 768', () => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="star-container"></div>`);
    global.document = dom.window.document;
    global.window = dom.window;
    global.window.innerWidth = 500;
    createStars();
    const container = document.getElementById('star-container');
    expect(container.children.length).toBe(200);
  });

  test('adds 1000 stars when width >= 768', () => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="star-container"></div>`);
    global.document = dom.window.document;
    global.window = dom.window;
    global.window.innerWidth = 1000;
    createStars();
    const container = document.getElementById('star-container');
    expect(container.children.length).toBe(1000);
  });
});
