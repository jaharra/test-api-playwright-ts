import { test, expect } from '../src/fixtures/api.fixture';
import { ApiAssertions } from '../src/utils/api-client';
import { TestDataGenerator } from '../src/utils/test-data-generator';
import { Post, Comment } from '../src/types';

function attachApiContext(name: string, method: string, url: string, response: any) {
  test.info().attach(name, {
    body: Buffer.from(
      JSON.stringify(
        {
          method,
          url,
          status: response.status,
          headers: response.headers,
          data: response.data,
        },
        null,
        2,
      ),
    ),
    contentType: 'application/json',
  });
}

test.describe('JSONPlaceholder API - Posts Endpoint', () => {
  test('should retrieve all posts', async ({ apiClient }) => {
    await test.step('GET /posts and verify response metadata', async () => {
      const response = await apiClient.get<Post[]>('/posts');
      attachApiContext('Posts response', 'GET', '/posts', response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify content type is application/json', async () => {
        ApiAssertions.expectContentType(response.headers, 'application/json');
      });
      await test.step('Verify response data is an array', async () => {
        expect(Array.isArray(response.data)).toBeTruthy();
      });
      await test.step('Verify response data has items', async () => {
        expect(response.data.length).toBeGreaterThan(0);
      });
    });
  });

  test('should retrieve a specific post by ID', async ({ apiClient }) => {
    await test.step('GET /posts/1 and validate returned post content', async () => {
      const postId = 1;
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      attachApiContext('Post by ID response', 'GET', `/posts/${postId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step(`Verify post ID is ${postId}`, async () => {
        expect(response.data.id).toBe(postId);
      });
      await test.step('Verify post title is present', async () => {
        expect(response.data.title).toBeTruthy();
      });
      await test.step('Verify post body is present', async () => {
        expect(response.data.body).toBeTruthy();
      });
      await test.step('Verify post userId is present', async () => {
        expect(response.data.userId).toBeTruthy();
      });
    });
  });

  test('should retrieve posts by userId', async ({ apiClient }) => {
    await test.step('GET /posts?userId=1 and verify filtered results', async () => {
      const userId = 1;
      const response = await apiClient.get<Post[]>(`/posts?userId=${userId}`);
      attachApiContext('Filtered posts response', 'GET', `/posts?userId=${userId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify response data is an array', async () => {
        expect(Array.isArray(response.data)).toBeTruthy();
      });
      await test.step(`Verify all posts belong to user ${userId}`, async () => {
        response.data.forEach((post) => {
          expect(post.userId).toBe(userId);
        });
      });
    });
  });

  test('should create a new post', async ({ apiClient }) => {
    await test.step('POST /posts and validate created post fields', async () => {
      const postData = TestDataGenerator.generatePost();
      const response = await apiClient.post<Post>('/posts', postData);
      attachApiContext('Create post response', 'POST', '/posts', response);

      await test.step('Verify status is 201 (Created)', async () => {
        ApiAssertions.expectStatusCode(response.status, 201);
      });
      await test.step(`Verify created post title matches "${postData.title}"`, async () => {
        expect(response.data.title).toBe(postData.title);
      });
      await test.step(`Verify created post body matches "${postData.body}"`, async () => {
        expect(response.data.body).toBe(postData.body);
      });
      await test.step(`Verify created post userId matches ${postData.userId}`, async () => {
        expect(response.data.userId).toBe(postData.userId);
      });
    });
  });

  test('should update an existing post', async ({ apiClient }) => {
    await test.step('PUT /posts/1 and verify update payload', async () => {
      const postId = 1;
      const updatedData = TestDataGenerator.generatePost();
      const response = await apiClient.put<Post>(`/posts/${postId}`, updatedData);
      attachApiContext('Update post response', 'PUT', `/posts/${postId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step(`Verify updated post title matches "${updatedData.title}"`, async () => {
        expect(response.data.title).toBe(updatedData.title);
      });
      await test.step(`Verify post ID remains ${postId}`, async () => {
        expect(response.data.id).toBe(postId);
      });
    });
  });

  test('should partially update a post', async ({ apiClient }) => {
    await test.step('PATCH /posts/1 and validate changed fields', async () => {
      const postId = 1;
      const patchData = { title: 'Updated Title' };
      const response = await apiClient.patch<Post>(`/posts/${postId}`, patchData);
      attachApiContext('Patch post response', 'PATCH', `/posts/${postId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step(`Verify patched post title is "${patchData.title}"`, async () => {
        expect(response.data.title).toBe(patchData.title);
      });
    });
  });

  test('should delete a post', async ({ apiClient }) => {
    await test.step('DELETE /posts/1 and validate deletion status', async () => {
      const postId = 1;
      const response = await apiClient.delete(`/posts/${postId}`);
      attachApiContext('Delete post response', 'DELETE', `/posts/${postId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
    });
  });

  test('should handle non-existent post with 404', async ({ apiClient }) => {
    await test.step('GET /posts/99999 and expect 404 response', async () => {
      const response = await apiClient.get<Post>('/posts/99999');
      attachApiContext('Not found post response', 'GET', '/posts/99999', response);

      await test.step('Verify status is 404 (Not Found)', async () => {
        ApiAssertions.expectStatusCode(response.status, 404);
      });
    });
  });
});

test.describe('JSONPlaceholder API - Comments Endpoint', () => {
  test('should retrieve all comments', async ({ apiClient }) => {
    await test.step('GET /comments and validate comment list', async () => {
      const response = await apiClient.get<Comment[]>('/comments');
      attachApiContext('Comments response', 'GET', '/comments', response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify response data is an array', async () => {
        expect(Array.isArray(response.data)).toBeTruthy();
      });
      await test.step('Verify response data has items', async () => {
        expect(response.data.length).toBeGreaterThan(0);
      });
    });
  });

  test('should retrieve comments for a specific post', async ({ apiClient }) => {
    await test.step('GET /comments?postId=<id> and verify comment mapping', async () => {
      const postId = TestDataGenerator.generateRandomPostId();
      const response = await apiClient.get<Comment[]>(`/comments?postId=${postId}`);
      attachApiContext('Filtered comments response', 'GET', `/comments?postId=${postId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify response data is an array', async () => {
        expect(Array.isArray(response.data)).toBeTruthy();
      });
      await test.step(`Verify all comments belong to post ${postId}`, async () => {
        response.data.forEach((comment) => {
          expect(comment.postId).toBe(postId);
        });
      });
    });
  });

  test('should create a new comment', async ({ apiClient }) => {
    await test.step('POST /comments and validate created comment details', async () => {
      const commentData = TestDataGenerator.generateComment();
      const response = await apiClient.post<Comment>('/comments', commentData);
      attachApiContext('Create comment response', 'POST', '/comments', response);

      await test.step('Verify status is 201 (Created)', async () => {
        ApiAssertions.expectStatusCode(response.status, 201);
      });
      await test.step(`Verify created comment name matches "${commentData.name}"`, async () => {
        expect(response.data.name).toBe(commentData.name);
      });
      await test.step(`Verify created comment email matches "${commentData.email}"`, async () => {
        expect(response.data.email).toBe(commentData.email);
      });
      await test.step(`Verify created comment body matches "${commentData.body}"`, async () => {
        expect(response.data.body).toBe(commentData.body);
      });
    });
  });

  test('should retrieve a specific comment by ID', async ({ apiClient }) => {
    await test.step('GET /comments/1 and validate comment identity', async () => {
      const commentId = 1;
      const response = await apiClient.get<Comment>(`/comments/${commentId}`);
      attachApiContext('Comment by ID response', 'GET', `/comments/${commentId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step(`Verify comment ID is ${commentId}`, async () => {
        expect(response.data.id).toBe(commentId);
      });
      await test.step('Verify comment email is present', async () => {
        expect(response.data.email).toBeTruthy();
      });
    });
  });
});

test.describe('JSONPlaceholder API - Users Endpoint', () => {
  test('should retrieve all users', async ({ apiClient }) => {
    await test.step('GET /users and verify user collection', async () => {
      const response = await apiClient.get('/users');
      attachApiContext('Users response', 'GET', '/users', response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify response data is an array', async () => {
        expect(Array.isArray(response.data)).toBeTruthy();
      });
      await test.step('Verify response data has items', async () => {
        expect(response.data.length).toBeGreaterThan(0);
      });
    });
  });

  test('should retrieve a specific user by ID', async ({ apiClient }) => {
    await test.step('GET /users/<id> and validate user fields', async () => {
      const userId = TestDataGenerator.generateRandomUserId();
      const response = await apiClient.get(`/users/${userId}`);
      attachApiContext('User by ID response', 'GET', `/users/${userId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step(`Verify user ID is ${userId}`, async () => {
        expect(response.data.id).toBe(userId);
      });
      await test.step('Verify user name is present', async () => {
        expect(response.data.name).toBeTruthy();
      });
      await test.step('Verify user email is present', async () => {
        expect(response.data.email).toBeTruthy();
      });
    });
  });

  test('should verify user has required fields', async ({ apiClient }) => {
    await test.step('GET /users/1 and ensure required fields are present', async () => {
      const userId = 1;
      const response = await apiClient.get(`/users/${userId}`);
      attachApiContext('User required fields response', 'GET', `/users/${userId}`, response);

      await test.step('Verify status is success (200-299)', async () => {
        ApiAssertions.expectStatusSuccess(response.status);
      });
      await test.step('Verify user has id field', async () => {
        expect(response.data).toHaveProperty('id');
      });
      await test.step('Verify user has name field', async () => {
        expect(response.data).toHaveProperty('name');
      });
      await test.step('Verify user has username field', async () => {
        expect(response.data).toHaveProperty('username');
      });
      await test.step('Verify user has email field', async () => {
        expect(response.data).toHaveProperty('email');
      });
    });
  });
});
