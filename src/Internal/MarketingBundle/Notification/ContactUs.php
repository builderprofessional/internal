<?php
/**
 * This notification will be sent to internal Builder Professional teams.
 *
 * @copyright 2016 Third Engine Software
 */
namespace Internal\MarketingBundle\Notification;


use Engine\EngineBundle\Base\Notification;
use Engine\EngineBundle\Base\EmailNotification;


class ContactUs extends Notification
{
  use EmailNotification;


  /**
   * @var string
   */
  protected $textTemplatePath = 'InternalMarketingBundle:EmailNotification:contactUs.text.twig';

  /**
   * @var string
   */
  protected $htmlTemplatePath = 'InternalMarketingBundle:EmailNotification:contactUs.html.twig';


  /**
   * @var string
   */
  protected $name;

  /**
   * @var string
   */
  protected $email;

  /**
   * @var string
   */
  protected $phone;

  /**
   * @var string
   */
  protected $timeAvailable;

  /**
   * @var string
   */
  protected $question;


  /**
   * @param string $name
   * @param string $email
   * @param string $phone
   * @param string $timeAvailable
   * @param string $question
   */
  public function __construct($name, $email, $phone, $timeAvailable, $question)
  {
    $this->name = $name;
    $this->email = $email;
    $this->phone = $phone;
    $this->timeAvailable = $timeAvailable;
    $this->question = $question;
  }

  /**
   * This method will add additional tokens that should be supported for this notification.
   */
  protected function addAdditionalTokens()
  {
    $this->addMemberToken('NAME', 'name');
    $this->addMemberToken('EMAIL', 'email');
    $this->addMemberToken('PHONE', 'phone');
    $this->addMemberToken('TIME_AVAILABLE', 'timeAvailable');
    $this->addMemberToken('QUESTION', 'question');
  }

  /**
   * @return string
   */
  protected function subject()
  {
    return 'Contact Request';
  }

  /**
   * @return array
   */
  public function getToEmail()
  {
    return ['sales@builderprofessional.com', 'support@builderprofessional.com'];
  }
}