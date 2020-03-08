package topickplace.webapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "topickplace")
public class DemoApplication {

	public static void main(String[] args) {
		System.setProperty("server.servlet.context-path", System.getenv("PATH_REFIX"));
		SpringApplication.run(DemoApplication.class, args);
	}

}
