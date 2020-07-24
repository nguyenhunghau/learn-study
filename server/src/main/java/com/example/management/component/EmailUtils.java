package com.example.management.component;

//<editor-fold defaultstate="collapsed" desc="IMPORT">
import com.example.management.constant.MyConstant;
import com.example.management.entity.AccountEntity;
import com.sendgrid.Content;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Personalization;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
//</editor-fold>

/**
 *
 * @author HungHau
 */
@Component
public class EmailUtils {
    
   private static final String CONTENT_TYPE_TEXT_PLAIN = "text/html";

   private static final String KEY_X_MOCK = "X-Mock";

   private static final String SEND_GRID_ENDPOINT_SEND_EMAIL = "mail/send";

   @Value("${send_grid.api_key}")
   private String sendGridApiKey;

   @Value("${send_grid.from_email}")
   private String sendGridFromEmail;

   @Value("${send_grid.from_name}")
   private String sendGridFromName;
   
   private static final Logger LOGGER = LoggerFactory.getLogger(EmailUtils.class);
   
   public void sendMail(String subject, String content, List<String> sendToEmails, List<String> ccEmails, List<String> bccEmails) {
       Mail mail = buildMailToSend(subject, content, sendToEmails, ccEmails, bccEmails);
       send(mail);
   }
   
   public boolean sendMailRegister(AccountEntity account) {
        String subject = "Xác nhận tài khoản";
        String link = MyConstant.DOMAIN + "account/active?code=" + account.getCode();
        String bodyMail = "Bạn đã đăng kí tài khoản thành công<br>"
                + "Mới bạn nhấn vào link bên dưới để active tài khoản<br>" + link;
        List<String> sendToEmails = new ArrayList<>();
        sendToEmails.add(account.getEmail());
        Mail mail = buildMailToSend(subject, bodyMail, sendToEmails, new ArrayList<>(), new ArrayList<>());
        return send(mail);
    }

   private boolean send(Mail mail) {
       SendGrid sg = new SendGrid(sendGridApiKey);
       sg.addRequestHeader(KEY_X_MOCK, "400");

       Request request = new Request();
       try {
           request.setMethod(Method.POST);
           request.setEndpoint(SEND_GRID_ENDPOINT_SEND_EMAIL);
           request.setBody(mail.build());
           Response response = sg.api(request);
           System.out.println(response.getStatusCode());
           return true;
       } catch (IOException ex) {
           LOGGER.error("Error sent mail with subject " + mail.getSubject(), ex);
           return false;
       }
   }

   private Mail buildMailToSend(String subject, String contentStr, List<String> sendToEmails, List<String> ccEmails, List<String> bccEmails) {
       Mail mail = new Mail();

       Email fromEmail = new Email();
       fromEmail.setName(sendGridFromName);
       fromEmail.setEmail(sendGridFromEmail);

       mail.setFrom(fromEmail);

       mail.setSubject(subject);

       Personalization personalization = new Personalization();

       //Add sendToEmails
       if (sendToEmails != null) {
           sendToEmails.stream().map((email) -> {
               Email to = new Email();
               to.setEmail(email);
               return to;
           }).forEachOrdered((to) -> {
               personalization.addTo(to);
           });
       }

       //Add ccEmail
       if (ccEmails != null) {
           for (String email : ccEmails) {
               Email cc = new Email();
               cc.setEmail(email);
               personalization.addCc(cc);
           }
       }

       //Add bccEmail
       if (bccEmails != null) {
           for (String email : bccEmails) {
               Email bcc = new Email();
               bcc.setEmail(email);
               personalization.addBcc(bcc);
           }
       }
       mail.addPersonalization(personalization);

       Content content = new Content();
       content.setType(CONTENT_TYPE_TEXT_PLAIN);
       content.setValue(contentStr);
       mail.addContent(content);
       return mail;
   }
}
