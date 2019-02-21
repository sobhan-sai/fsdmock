package jsonjwt;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.assertj.core.util.Arrays;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.test.context.junit4.SpringRunner;

import com.test.ApplicationMain;
import com.test.model.JwtResponse;
import com.test.model.ResponseMessage;
import com.test.model.SearchedWord;
import com.test.model.Users;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=ApplicationMain.class,webEnvironment = WebEnvironment.RANDOM_PORT)
public class ControllerTestMockMvc {
	private static final Logger logger=LoggerFactory.getLogger(ControllerTestMockMvc.class);
	
	@Autowired TestRestTemplate testTemplate;

//	@Test
//	public void testSuccesfullLogin(){
//		Users user=new Users();
//		user.setUserName("");
//		
//	}
	
	@Test
	public void testSuccesfulSignUp(){
		Users user=new Users("test","test123","test@gmail.com","user@123456",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response-{}",response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("user registration succesful"));
	}
	@Test
	public void testExistingUrname(){
		Users user=new Users("usergff1234","user123456","usdfferasdfgh@gmail.com","user@123456",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response-{}",response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("username already exists"));
	}
	@Test
	public void testExistingemail(){
		Users user=new Users("user1234","user123456","userasdfgh@gmail.com","user@123456",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response-{}",response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("email already exists"));
	}
	@Test
	public void testSuccesfulLogin(){
		Users user=new Users("test123","user@123456");
		ResponseEntity<JwtResponse> response=testTemplate.postForEntity("/api/auth/signin",user, JwtResponse.class);
		logger.info("Response->{}",response.getStatusCode());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	@Test
	public void testUnsuccesfulLogin(){
		Users user=new Users("gfjgdjgfd","usghfdgjer@123456");
		ResponseEntity<JwtResponse> response=testTemplate.postForEntity("/api/auth/signin",user, JwtResponse.class);
		logger.info("Response->{}",response.getStatusCode());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.CONFLICT));
	}
	@Test
	public void testBadUnsuccesfulLogin(){
		Users user=new Users("sobhansai","usghfdgfgvgfbfjer@123456");
		ResponseEntity<JwtResponse> response=testTemplate.postForEntity("/api/auth/signin",user, JwtResponse.class);
		logger.info("Response->{}",response.getStatusCode());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
	}
	
	
	
	@Test
	public void testEmptyUserName(){
		Users user=new Users("userfgf123fhhj4","","ussderfffasdfgh@gmail.com","user@123456",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response->{}", response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("Error"));
	}
	@Test
	public void testEmptyName(){
		Users user=new Users("","fdghjkfdkhfkdhjfjk","ussderfffasdfgh@gmail.com","user@123456",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response->{}", response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("Error:"));
	}
	@Test
	public void testEmptyPassword(){
		Users user=new Users("gfbghkh","fdghjgjkkfdkhfkdhjfjk","ufssderfffasdfgh@gmail.com","",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response->{}", response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("Error:"));
	}
	@Test
	public void testSmallPassword(){
		Users user=new Users("userfgf1234","tst","userfffffasdfgh@gmail.com","user",2);
		ResponseEntity<ResponseMessage> response=testTemplate.postForEntity("/api/auth/signup", user, ResponseMessage.class);
		logger.info("Response-{}",response.getBody().getMessage());
		assertThat(response.getBody().getMessage(),containsString("Error:"));
	}
	
	
//
////	@WithMockUser(roles={"ROLE_ADMIN"})
//	@Test
//	public void testSaveSearchedKeyword(){
//		String token=
//		SearchedWord search = new SearchedWord("test","test");
//		ResponseEntity<Boolean> response=testTemplate.postForEntity("api/user/searchedWord", search, Boolean.class);
//	}
	
	
	@Test
	public void testSaveSearchKeyword(){
		SearchedWord search=new SearchedWord("sobhansai","fdghhfhgf");
		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
		HttpHeaders header=new HttpHeaders();
		header.set("Authorization","Bearer "+token);
		HttpEntity<?> http=new HttpEntity<Object>(search,header);
		ResponseEntity<Boolean> response=testTemplate.exchange("/api/user/searchedWord",HttpMethod.POST,http,Boolean.class);
		assertThat(response.getStatusCode(),equalTo(HttpStatus.CREATED));
		assertThat(response.getBody(),equalTo(true));
	}
//	@Test
//	public void testEmptySavSearchKeyword(){
//		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
//		HttpHeaders header=new HttpHeaders();
//		header.set("Authorization","Bearer "+token);
//		HttpEntity<?> http=new HttpEntity<Object>(null,header);
//		ResponseEntity<?> response=testTemplate.exchange("/api/user/searchedWord",HttpMethod.POST,http,Boolean.class);
//		assertThat(response.getStatusCode(),equalTo(HttpStatus.CONFLICT));
////		assertThat(response.getBody(),equalTo(false));
//	}
	
	@Test
	public void getAllSearchKeyword(){
		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
		HttpHeaders header=new HttpHeaders();
		header.set("Authorization","Bearer "+token);
		HttpEntity<?> http=new HttpEntity<Object>(null,header);
		ResponseEntity<Object[]> response=testTemplate.exchange("/api/user/getAllSearchedWords/{userName}",HttpMethod.GET,http,Object[].class,"sobhansai");
		List<Object> list=Arrays.asList(response.getBody());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	@Test
	public void deleteSearchedKwyword(){
		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
		HttpHeaders header=new HttpHeaders();
		header.set("Authorization","Bearer "+token);
		HttpEntity<?> http=new HttpEntity<Object>(null,header);
		ResponseEntity<Boolean> response=testTemplate.exchange("/api/user/deleteSearchedWords/{searchedId}",HttpMethod.DELETE,http,Boolean.class,49);
		assertThat(response.getBody(),equalTo(true));
		
	}
	@Test
	public void getAllUsers(){
		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
		HttpHeaders header=new HttpHeaders();
		header.set("Authorization","Bearer "+token);
		HttpEntity<?> http=new HttpEntity<Object>(null,header);
		ResponseEntity<Object[]> response=testTemplate.exchange("/api/user/blacklist/{username}",HttpMethod.GET,http,Object[].class,"sobha");
		List<Object> list=Arrays.asList(response.getBody());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
		
	}
	@Test
	public void blockUser(){
		String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2JoYW5zYWkiLCJpYXQiOjE1NTA1NzM5ODEsImV4cCI6MTU1MDY2MDM4MX0.Rj5RnKf5t6zn2_eng1G8e6Q0li25TCJOzXptpndqtjUjUC3ezeQrlKJn_wohAu4Zz8V16DUt0V3O2F5EY9VYWA";
		HttpHeaders header=new HttpHeaders();
		header.set("Authorization","Bearer "+token);
		HttpEntity<?> http=new HttpEntity<Object>(null,header);
		ResponseEntity<Boolean> response=testTemplate.exchange("/api/user/blacklist/{id}",HttpMethod.PATCH,http,Boolean.class,"3");
		assertThat(response.getBody(),equalTo(true));
	}
	}
