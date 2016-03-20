<?php
namespace Internal\MarketingBundle\Tests\Notification;


use Internal\MarketingBundle\Notification\ContactUs;

use Engine\EngineBundle\Tests\NotificationTestCase;


class ContactUsTest extends NotificationTestCase
{
  /**
   * @group debug
   */
  public function testGetSubjectReturnsCorrectValue()
  {
    $contactUsNotification = new ContactUs(null, null, null, null, null);
    $this->assertEquals('Contact Request', $contactUsNotification->getSubject());
  }

  public function testGetToEmailReturnsSalesList()
  {
    $contactUsNotification = new ContactUs(null, null, null, null, null);
    $this->assertEquals('sales@builderprofessional.com', $contactUsNotification->getToEmail());
  }

  public function testAdditionalTokensReturnCorrectValues()
  {
    $name = 'Tony Vance';
    $email = 'tony.vance@builderprofessional.com';
    $phone = '111-111-1111';
    $timeAvailable = 'Anytime is cool';
    $question = 'what is up yo?';

    $contactUsNotification = new ContactUs($name, $email, $phone, $timeAvailable, $question);

    $this->assertTokenValue($name, $contactUsNotification, 'NAME');
    $this->assertTokenValue($email, $contactUsNotification, 'EMAIL');
    $this->assertTokenValue($phone, $contactUsNotification, 'PHONE');
    $this->assertTokenValue($timeAvailable, $contactUsNotification, 'TIME_AVAILABLE');
    $this->assertTokenValue($question, $contactUsNotification, 'QUESTION');
  }
}