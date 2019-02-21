package jsonjwt;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.test.model.Article;
import com.test.model.Role;
import com.test.model.SearchedWord;
import com.test.model.Users;
import com.test.repository.ArticleRepository;
import com.test.repository.RoleRepository;
import com.test.repository.SearchedWordRespository;
import com.test.repository.UserRepository;
import com.test.service.UserService;

public class UserServiceMockitoTest {
	private static final Logger logger=LoggerFactory.getLogger(ControllerTestMockMvc.class);
	@InjectMocks
	UserService userService;
	@Mock
	UserRepository userRepo;
	@Mock
	RoleRepository roleRepo;
	@Mock
	ArticleRepository articleRepo;
	@Mock
	SearchedWordRespository searchRepo;
	
	
	@Before
	public void setUp() throws Exception{
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testUserRegistration(){
		
		Users user=new Users();
		user.setName("testuser");
		user.setUserName("usertest123");
		user.setUserEmail("test@gmail.com");
		user.setPassword("user@123456");
		user.setRoles(2);
		userService.save(user);
		verify(userRepo,times(1)).save(user);
	}
	
	@Test
	public void testGetUserByUsername(){
		Users user1=new Users();
		user1.setName("testuser");
		user1.setUserName("usertest123");
		user1.setUserEmail("test@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		when(userRepo.findByUserName("usertest123")).thenReturn(new Users("testuser","usertest123","test@gmail.com","user@123456",2));
		Users test=userService.getUsersByUsername("usertest123");
		assertEquals("testuser",test.getName());
		assertEquals("usertest123",test.getUserName());
		assertEquals("test@gmail.com",test.getUserEmail());
		
	}
	@Test
	public void testGetRoleById(){
		Role role=new Role(1,"ROLE_USER");
		when(roleRepo.findById(1)).thenReturn(role);
		Role roles=userService.getRoleById(1);
		assertEquals(1,roles.getId());
		assertEquals("ROLE_USER",roles.getRoleName());
	}
	
	@Test
	public void testForExistEmail(){
		Users user1=new Users();
		user1.setName("testuser");
		user1.setUserName("usertest123");
		user1.setUserEmail("test@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		when(userRepo.existsByUserEmail("test@gmail.com")).thenReturn(true);
		boolean status=userService.existByEmail("test@gmail.com");
		assertEquals(true,status);
	}
	
	@Test
	public void testForExistUsername(){
		Users user1=new Users();
		user1.setName("testuser");
		user1.setUserName("usertest123");
		user1.setUserEmail("test@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		when(userRepo.existsByUserName("usertest123")).thenReturn(true);
		boolean status=userService.existByUsername("usertest123");
		assertEquals(true,status);
	}
	
	@Test
	public void saveArticleTest(){
		List<Article> article=new ArrayList<Article>();
		Article article0=new Article("test","gvdgvhvhdvvcnvxngdhvndvhgvfghdfghgvgdfdhghjgd","gfhghdjgfdgd","hdgdhsghghdg","abcde","gdgdggdg");
	    article.add(article0);
	   userService.saveArticle(article);
	   verify(articleRepo,times(1)).saveAll(article);
	}
	@Test
	public void saveSearchedWord(){
		SearchedWord search=new SearchedWord("rahul","sher");
		userService.saveSearchedKeyword(search);
		verify(searchRepo,times(1)).save(search);
	}
	@Test(expected=NullPointerException.class)
	public void emptySearchWord(){
		when(searchRepo.save(null)).thenThrow(new NullPointerException());
		userService.saveSearchedKeyword(null);
	}
	@Test
	public void getAllSearchedWords(){
		List<SearchedWord> list=new ArrayList<>();
		SearchedWord search0=new SearchedWord("rahul","gully");
		SearchedWord search1=new SearchedWord("rahul","gullyboy");
		list.add(search0);
		list.add(search1);
		when(searchRepo.findByUserName("rahul")).thenReturn(list);
		List<SearchedWord> list1=userService.getAllSearchedWords("rahul");
		assertEquals(2,list1.size());
	}
	@Test
	public void deletSearchedWord(){
		userService.deleteSearchedWord(1);
		verify(searchRepo,times(1)).deleteById(1);
		
		
	}
	@Test
	public void deletenullWord(){
	  userService.deleteSearchedWord(0);
	}
	@Test
	public void getAllUsers(){
		Users user1=new Users();
		user1.setName("testuser");
		user1.setUserName("usertest123");
		user1.setUserEmail("test@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		Users user2=new Users();
		user1.setName("testuserfgfd");
		user1.setUserName("usertest123");
		user1.setUserEmail("testfdd@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		List<Users> users=new ArrayList<Users>();
		users.add(user1);
		users.add(user2);
		when(userRepo.searchUsersByUsername("test")).thenReturn(users);
		List<Users> users1=userService.searchByUsername("test");
		assertEquals(2,users1.size());	
	}
	@Test
	public void returnEmptyList(){
		List<Users> user=new ArrayList<>();
		when(userRepo.searchUsersByUsername("gdfhdsd")).thenReturn(user);
		List<Users> list=userService.searchByUsername("gdfhdsd");
		assertEquals(0,list.size());
	}
	@Test
	public void blockUser(){
		Users user1=new Users();
		user1.setName("testuser");
		user1.setUserName("usertest123");
		user1.setUserEmail("test@gmail.com");
		user1.setPassword("user@123456");
		user1.setRoles(2);
		when(userRepo.findById(1L)).thenReturn(Optional.of(user1));
		boolean status=userService.deleteUser(1L);
		assertEquals(true,status);
		
	}
	
	
}
