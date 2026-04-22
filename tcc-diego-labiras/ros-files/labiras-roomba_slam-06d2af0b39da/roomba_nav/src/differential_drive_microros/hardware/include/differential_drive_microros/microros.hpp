#ifndef MICROROS_HPP
#define MICROROS_HPP

#include "rclcpp/rclcpp.hpp"
#include "create_msgs/msg/wheels.hpp"
#include "create_msgs/msg/pwm_wheel.hpp"


class Microros : public rclcpp::Node
{

public:
  Microros() : Node("middleware_microros")
  {
    subscription_ = this->create_subscription<create_msgs::msg::Wheels>(
        "/diff_cont/wheels",
        rclcpp::QoS(10),
        std::bind(&Microros::wheelsCallback, this, std::placeholders::_1));

    publisher_ = this->create_publisher<create_msgs::msg::PwmWheel>("/diff_cont/pwm_wheel", 10); // CHANGE
  };


  void read_encoder_values(int &val_1, int &val_2)
  {
    val_1 = encoder_left_wheel_;
    val_2 = encoder_right_wheel_;
  };

  void setMotorValues(int pwm_left, int pwm_right){
    auto message = create_msgs::msg::PwmWheel();
    
    message.pwm_left_wheel = pwm_left;
    message.pwm_right_wheel = pwm_right;
    publisher_->publish(message);
  };

private:
  int encoder_left_wheel_;
  int encoder_right_wheel_;
  // Função de retorno de chamada para o tópico personalizado
  void wheelsCallback(const create_msgs::msg::Wheels::SharedPtr msg)
  {
    encoder_left_wheel_ = msg->encoder_counts_left;
    encoder_right_wheel_ = msg->encoder_counts_right;
  }

  rclcpp::Subscription<create_msgs::msg::Wheels>::SharedPtr subscription_;
  rclcpp::Publisher<create_msgs::msg::PwmWheel>::SharedPtr publisher_;
};

#endif // MICROROS_HPP
