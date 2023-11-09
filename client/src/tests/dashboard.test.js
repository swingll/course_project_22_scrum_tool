import React from 'react';
import {BrowserRouter, MemoryRouter, Route, Router, Routes} from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '../components/dashboard';
import {Provider} from "react-redux";
import ReactRouter from 'react-router'
import store, { persistor } from '../states';
import {useUserProfile} from "../states/user/hooks";
import * as userEvent from "react-dom/test-utils";

jest.mock('../states/permission/hooks', () => ({
  useAuthorize: () => (true),
}))
jest.mock('../states/story/hooks', () => {
  const haha = jest.requireActual('../states/story/hooks')
  return{
    ...haha,
    useStories: () => ({
      stories: [
        {
          "members": [],
          "tasks": [
            {
              "title": "2134",
              "content": "2314",
              "contributors": [
                {
                  "roles": [
                    "654c710bde06574814d72224"
                  ],
                  "public": false,
                  "profilePhoto": "default.jpg",
                  "_id": "654c710bde06574814d72225",
                  "username": "123",
                  "email": "123",
                  "createdAt": "2023-11-09T05:41:31.303Z",
                  "updatedAt": "2023-11-09T05:41:31.303Z",
                  "__v": 1
                }
              ],
              "status": 1,
              "color": "#2196f3",
              "_id": "654c71d0398d610cb0c1a96b",
              "story": "654c71bb398d610cb0c1a942",
              "date": "2023-11-09T05:44:48.606Z",
              "due": "2023-11-09T05:44:48.606Z",
              "createdAt": "2023-11-09T05:44:48.606Z",
              "updatedAt": "2023-11-09T05:44:48.606Z",
              "__v": 0
            }
          ],
          "timeline": "654c71bd398d610cb0c1a94d",
          "_id": "654c71bb398d610cb0c1a942",
          "title": "story1234",
          "creator": {
            "roles": [
              "654c710bde06574814d72224"
            ],
            "public": false,
            "profilePhoto": "default.jpg",
            "_id": "654c710bde06574814d72225",
            "username": "123",
            "email": "123",
            "createdAt": "2023-11-09T05:41:31.303Z",
            "updatedAt": "2023-11-09T05:41:31.303Z",
            "__v": 1
          },
          "createdAt": "2023-11-09T05:44:27.999Z",
          "updatedAt": "2023-11-09T05:44:27.999Z",
          "__v": 1
        },
        {
          "members": [],
          "tasks": [
            {
              "title": "12343",
              "content": "423",
              "contributors": [
                {
                  "roles": [
                    "654c710bde06574814d72224"
                  ],
                  "public": false,
                  "profilePhoto": "default.jpg",
                  "_id": "654c710bde06574814d72225",
                  "username": "123",
                  "email": "123",
                  "createdAt": "2023-11-09T05:41:31.303Z",
                  "updatedAt": "2023-11-09T05:41:31.303Z",
                  "__v": 1
                }
              ],
              "status": 1,
              "color": "#2196f3",
              "_id": "654c71e0398d610cb0c1a978",
              "story": "654c71c0398d610cb0c1a956",
              "date": "2023-11-09T05:45:04.170Z",
              "due": "2023-11-09T05:45:04.170Z",
              "createdAt": "2023-11-09T05:45:04.170Z",
              "updatedAt": "2023-11-09T05:45:04.170Z",
              "__v": 0
            }
          ],
          "timeline": "654c71c1398d610cb0c1a960",
          "_id": "654c71c0398d610cb0c1a956",
          "title": "stroy2134",
          "creator": {
            "roles": [
              "654c710bde06574814d72224"
            ],
            "public": false,
            "profilePhoto": "default.jpg",
            "_id": "654c710bde06574814d72225",
            "username": "123",
            "email": "123",
            "createdAt": "2023-11-09T05:41:31.303Z",
            "updatedAt": "2023-11-09T05:41:31.303Z",
            "__v": 1
          },
          "createdAt": "2023-11-09T05:44:32.171Z",
          "updatedAt": "2023-11-09T05:44:32.171Z",
          "__v": 1
        }
      ],
      count: 2
    }),
    useFetchStories:()=>{return [()=>{}]},

  }
})
test('renders dashboard component', () => {

  location = {pathname:'/story/1',href:"/story/1"}
  render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/story/1"]}>
          <Routes>
            <Route path="/story/:id" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </Provider>
  );

  const logoElement = screen.getByText(/Scrum Beta/i);
  // const addButtonElement = screen.getByText(/Create a story first/i);

  expect(logoElement).toBeInTheDocument();
  // expect(addButtonElement).toBeInTheDocument();
});


test('displays "no story here" message when stories exist but count is 0', () => {
  const location = { pathname: '/story/1', href: '/story/1' };
  // Mock the useStories hook to return an array of stories with count as 0


  render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/story/1"]}>
          <Routes>
            <Route path="/story/:id" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </Provider>
  );

  const messageElement = screen.getByText(/create a story first/i);
  expect(messageElement).toBeInTheDocument();
});

test('getByText', () => {
  const location = { pathname: '/story/1', href: '/story/1' };
  const navigateMock = jest.fn();

  // Mock the useStories hook to return an array of stories
  // jest.mock('../states/story/hooks', () => ({
  //   useStories: () => ({
  //     stories: [{ _id: '1', title: 'Story 1' }, { _id: '2', title: 'Story 2' }],
  //     count: 2
  //   }),
  // }));
  render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/story/1"]}>
          <Routes>
            <Route path="/story/:id" element={<Dashboard />} />
          </Routes>
        </MemoryRouter>
      </Provider>
  );

  const storyLink = screen.getByText(/Story 2/i);
  expect(storyLink).toBeInTheDocument();
});
test('navigates to the selected story when a story link is clicked', () => {
  const location = { pathname: '/story/654c710bde06574814d72225', href: '/story/654c710bde06574814d72225' };
  const navigateMock = jest.fn();

  render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/story/654c71c0398d610cb0c1a956']}>
          <Routes>
            <Route path="/story/:id" element={<Dashboard />}>
            </Route>
          </Routes>

        </MemoryRouter>
      </Provider>
  );


  const storyLink = screen.getByText(/stroy2134/i);
  userEvent.click(storyLink);

  expect(navigateMock).toHaveBeenCalledWith('/story/654c71c0398d610cb0c1a956');
});