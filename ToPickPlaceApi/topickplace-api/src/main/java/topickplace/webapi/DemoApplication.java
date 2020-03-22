package topickplace.webapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "topickplace")
public class DemoApplication {

	public static void main(String[] args) {
		var prefix = System.getenv("PATH_PREFIX");
		if(prefix!=null && !prefix.isEmpty()){
			System.setProperty("server.servlet.context-path", prefix);
		}
		SpringApplication.run(DemoApplication.class, args);
	}

}
