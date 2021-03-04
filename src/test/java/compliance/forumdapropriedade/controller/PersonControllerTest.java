package compliance.forumdapropriedade.controller;

import compliance.forumdapropriedade.ForumDaPropriedadeApplication;
import compliance.forumdapropriedade.domain.Person;
import compliance.forumdapropriedade.service.PersonService;
import compliance.forumdapropriedade.util.PasswordGenerator;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = ForumDaPropriedadeApplication.class)
@WebAppConfiguration
@AutoConfigureMockMvc
public class PersonControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(context)
                .build();
    }

    @Test
    public void personControllerShouldgetAllPersons() throws Exception {
        mockMvc.perform(get("/funcionario")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(200));
    }

    @Test
    public void personControllerShouldNotPostWihoutBindingFields() throws Exception {
        String json = "    {\n" +
                "    \"name\": \"Jose\",\n" +
                "    \"cpf\": \"02862958069\", \n" +
                "    \"schooling\": \"Superior completo\", \n" +
                "    \"profession\": \"Engenheiro\", \n" +
                "    \"occupation\": \"Engenheiro\", \n" +
                "    \"email\": \"jose.goulart@acad.pucrs.br\", \n" +
                "    \"companyCnpj\": \"96.885.293/0001-00\", \n" +
                "    \"phone\": \"55999767794\", \n" +
                "    \"birthday\": \"16/01/1999\" \n" +
                "    }";

        mockMvc.perform(post("/funcionario")
                .contentType("application/json")
                .content(json))
                .andExpect(status().is(200));
    }
}
